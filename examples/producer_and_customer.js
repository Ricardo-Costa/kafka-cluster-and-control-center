import { Kafka } from "kafkajs"

try {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka-1:19092', 'kafka-2:29092', 'kafka-3:39092'],
    connectionTimeout: 500,
    retry: {
      initialRetryTime: 100,
      retries: 8
    }
  })

  const producer = kafka.producer()
  const runProducer = async () => {
    
    await producer.connect()
    
    let counter = 0
    setInterval(async () => {
      await producer.send({
        topic: 'products',
        messages: [
          { value: `Hello KafkaJS user! ${counter}` },
        ],
      })
      counter++
    }, 1000)
  }

  runProducer()


  const consumer = kafka.consumer({ groupId: 'test-group' })
  const runConsumer = async () => {

    await consumer.connect()
    await consumer.subscribe({ topic: 'products', fromBeginning: true })
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        })
      },
    })

  }

  runConsumer()

} catch (err) {
  console.log(err)
}
