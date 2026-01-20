namespace TaskManagement.API.Services.DateParsing
{
    public static class NaturalDateParser
    {

        public static DateTime? Parse(string word)
        {
            var lower = word.ToLower();

            if (lower == "today")
                return DateTime.Today;
            if (lower == "tomorrow")
                return DateTime.Today.AddDays(1);
            if (lower == "day after tomorrow")
                return DateTime.Today.AddDays(2);
            if (lower == "next week")
                return DateTime.Today.AddDays(7);
            if (lower == "next month")
                return DateTime.Today.AddMonths(1);
            if (lower == "next year")
                return DateTime.Today.AddYears(1);
            return null;
        }
    }
}
