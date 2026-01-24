   public class TaskMLModels
    {
        public class TaskInput
        {
            public string Title { get; set; }
            public string Description { get; set; }
        }

        public class TaskPrediction
        {
            public int PredictedLabel { get; set; }
            public float[] Score { get; set; }
        }
    }
