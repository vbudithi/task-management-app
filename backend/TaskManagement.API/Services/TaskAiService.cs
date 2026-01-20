using System.Text;
using System.Text.Json;
using TaskManagement.API.DTOs;
using TaskManagement.API.Models.HuggingFace;
using TaskManagement.API.Services.DateParsing;

namespace TaskManagement.API.Services;
public class TaskAiService:ITaskAiService
{ 
    private readonly HttpClient _httpClient;
    //private readonly string _hfApiKey;
    private readonly ILogger<TaskAiService> _logger;

    public TaskAiService(HttpClient httpClient, IConfiguration config, ILogger<TaskAiService> logger)
    {
        _httpClient = httpClient;
       // _hfApiKey = config["HF_API_KEY"]!;
        _logger = logger;

    }

    public async Task<AiTaskInsightsDto>AnalyzeDescriptionAsync(string description)
        {

            var entities = await GetEntitiesAsync(description);
            var detectedDate = ExtractDateFromEntities(entities);
            var detectedPriority = PriorityParser.ExtractPriorityFromText(description);

            return new AiTaskInsightsDto
            {
                SuggestedDueDate = detectedDate,
                SuggestedPriority = detectedPriority
            };
        }

        private async Task<List<NerEntity>> GetEntitiesAsync(string text)
        {
         //local python NER Model
            var request = new HttpRequestMessage(
           HttpMethod.Post,
           "http://127.0.0.1:8000/ner"
       );

        //Hugging face model
        /*var request = new HttpRequestMessage( HttpMethod.Post,"https://api-inference.huggingface.co/models/flair/ner-english");
         request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _hfApiKey*/

        request.Content = new StringContent(
                JsonSerializer.Serialize(new { inputs = text }),
                Encoding.UTF8,
                "application/json"
            );
        _logger.LogInformation("Calling Local python NER model with text: {text}", text);


        var response = await _httpClient.SendAsync( request );
        var responseString = await response.Content.ReadAsStringAsync();

        _logger.LogInformation(
            "HF API response: {statusCode} {reasonPhrase} – Body: {body}",
            (int)response.StatusCode,
            response.ReasonPhrase,
            responseString
        );

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("NER server error: {0}", responseString);
            return new List<NerEntity>(); // safe fallback
        }

        var deserialized = JsonSerializer.Deserialize<List<NerEntity>>(responseString);
        return deserialized ?? new List<NerEntity>();
    }

        private DateTime? ExtractDateFromEntities(List<NerEntity> entities) {

        var dateEntity = entities.FirstOrDefault(e => e.EntityGroup?.ToLower().Contains("date")==true);
        if (dateEntity == null) return null;

        var word = dateEntity.Word;

        //literal parsing
        if (DateTime.TryParse(word, out var parsed))
        {
            _logger.LogInformation("Parsed literal date from word: {word}", word);
            return parsed;
        }

        //natural language parsing
        //Try natural language (e.g. "tomorrow")
        var natural = NaturalDateParser.Parse(word);
        if (natural != null)
        {
            _logger.LogInformation("Parsed natural language date: {word} -> {date}", word, natural);
            return natural;
        }

        _logger.LogWarning("Failed to parse date from entity: {word}", word);
        return null;

    }

}
