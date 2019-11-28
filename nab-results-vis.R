# Visualizing anomaly detection output

resultsFile <- "../NAB/results/chebyshev/realAWSCloudwatch/chebyshev_ec2_cpu_utilization_24ae8d.csv"
data <- read.csv(resultsFile)
plot(data$value, type="l", main = "EC2 CPU Utilization", ylab = "CPU Utilization")
points(which(data$label == 1), data$value[data$label == 1], col="red")
points(which(data$anomaly_score > 0.0), data$value[data$anomaly_score > 0.0], col="blue", pch="x")
