using Microsoft.ML;
using TaskManagement.API.ML.Models;

public static class TaskPredictor
    {
    private static readonly string ModelPath = Path.Combine(AppContext.BaseDirectory, "ML", "task_model.zip");
    private static readonly MLContext mlContext = new();
    private static ITransformer? model;

    private static void LoadModel()
    {
        if (!File.Exists(ModelPath))
            throw new FileNotFoundException($"Model not found: {ModelPath}");

        model = mlContext.Model.Load(ModelPath, out _);
    }
    public static TaskMLModels.TaskPrediction Predict(TaskInput input)
    {
        if (model == null)
            LoadModel();

        var engine = mlContext.Model.CreatePredictionEngine<TaskInput, TaskMLModels.TaskPrediction>(model, ignoreMissingColumns: true);
        return engine.Predict(input);

    }
}

