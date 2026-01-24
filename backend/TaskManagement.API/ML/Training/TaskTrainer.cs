//Training the pipeline
//ML Engine

using Microsoft.ML;
using TaskManagement.API.ML.Models;

public static class TaskTrainer
{

    private static readonly string ModelPath =
        Path.Combine(AppContext.BaseDirectory, "ML", "task_model.zip");

    public static void Train(List<TaskTrainingRow> rows)
    {
        if (File.Exists(ModelPath))
        {
            File.Delete(ModelPath);
            Console.WriteLine("Old model deleted");
        }

        var mlContext = new MLContext(seed: 1);

        var dataView = mlContext.Data.LoadFromEnumerable(rows);

        // Features
        var pipeline = mlContext.Transforms.Text
            .FeaturizeText("TitleFeats", "Title")
            .Append(mlContext.Transforms.Text.FeaturizeText("DescFeats", "Description"))
            .Append(mlContext.Transforms.Concatenate("Features", "TitleFeats", "DescFeats"))

            // Label mapping ONLY for training
            .Append(mlContext.Transforms.Conversion.MapValueToKey(
                outputColumnName: "LabelKey",
                inputColumnName: "Label"))

            // Trainer
            .Append(mlContext.MulticlassClassification.Trainers
                .SdcaMaximumEntropy(
                    labelColumnName: "LabelKey",
                    featureColumnName: "Features"
                ))

            // Convert back for prediction output
            .Append(mlContext.Transforms.Conversion.MapKeyToValue(
                outputColumnName: "PredictedLabel",
                inputColumnName: "PredictedLabel"));

        var model = pipeline.Fit(dataView);

        Directory.CreateDirectory(Path.GetDirectoryName(ModelPath)!);
        mlContext.Model.Save(model, dataView.Schema, ModelPath);

        Console.WriteLine($"ML model saved to {ModelPath}");
    }
}


