# Visualizing anomaly detection output

# Chebushev
#resultsFile <- "../NAB/results/chebyshev/realAWSCloudwatch/chebyshev_ec2_cpu_utilization_24ae8d.csv"
#threshold = 0

# Windowed Gaussian
resultsFile <- "../NAB/results/windowedGaussian/realAWSCloudwatch/windowedGaussian_ec2_cpu_utilization_24ae8d.csv"
threshold = 0.9999999999997738

# Read and Plot
data <- read.csv(resultsFile)
plot(data$value, type="l", main = "EC2 CPU Utilization", ylab = "CPU Utilization")
points(which(data$label == 1), data$value[data$label == 1], col="red")
points(which(data$anomaly_score > threshold), data$value[data$anomaly_score > threshold], col="blue", pch="x")
