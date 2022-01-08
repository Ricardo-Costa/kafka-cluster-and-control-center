# Kafka Cluster & Control Center
Basic structure and examples to start with kafka to your projects.

## Others

Create Topic by command line<br>
- Access container:<br/>
  > `docker exec -ti kafka-1 bash`
- Run command to create:
  > `kafka-topics --create --bootstrap-server kafka-2:29092 --replication-factor 3 --partitions 3 --topic mytopic`
- Run command to list:
  > `kafka-topics --list --bootstrap-server kafka-2:29092`