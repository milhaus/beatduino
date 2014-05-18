import java.io.IOException;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;


String EXCHANGE_NAME = "bpm";
String EXCHANGE_NAME2 = "motion";
ConnectionFactory factory;
Connection connection;

// for BPM server
Channel channel;
String  queueName;
QueueingConsumer consumer;

// Motion sensor
Channel Motionchannel;
String  MotionqueueName;
QueueingConsumer Motionconsumer;

int r=0, g=0, b=0;
int color_timer = 0;

PImage[] benderz = new PImage[4];

JSONObject json;

void setup() {
  size(480, 590);
  frameRate(25);  
  
  for ( int i = 0; i < benderz.length; i++) {
    benderz[i] = loadImage( "bender" + i + ".jpg");
  }
  
  try 
  {
    factory = new ConnectionFactory();
    factory.setHost("172.16.10.75");
    connection = factory.newConnection();
    
    channel = connection.createChannel();
    channel.exchangeDeclare(EXCHANGE_NAME, "fanout", false, true, null );
    queueName = channel.queueDeclare().getQueue();
    channel.queueBind(queueName, EXCHANGE_NAME, "");
    consumer = new QueueingConsumer(channel);
    channel.basicConsume(queueName, true, consumer);
    
    Motionchannel = connection.createChannel();
    Motionchannel.exchangeDeclare(EXCHANGE_NAME2, "fanout", false, true, null );
    MotionqueueName = Motionchannel.queueDeclare().getQueue();
    Motionchannel.queueBind(MotionqueueName, EXCHANGE_NAME2, "");
    Motionconsumer = new QueueingConsumer(Motionchannel);
    Motionchannel.basicConsume(MotionqueueName, true, Motionconsumer);
    
  } 
  catch (IOException e) 
  {
    println("Ooft, couldnae connect");
  }
}

void draw() {
  println("RGB: " + r + g + b);
  background(r * 255, g * 255, b * 255);
  
  
  try
  {
    QueueingConsumer.Delivery delivery = consumer.nextDelivery();
    String message = new String(delivery.getBody());
    println(" [x] Received '" + message + "'");
    color_timer++; // messages are too fast, slow them down with a modulo
    println("COLOR TIMER" + color_timer);
    int numb = color_timer % 4;
    image(benderz[numb], 0, 0);
    
    color_timer++; // messages are too fast, slow them down with a modulo
    if ( color_timer % 4 == 0) { 
      b = 1 - b;
      if (b > 0) {
        g = 1 - g;
        if (g > 0) {
         r = 1 -r;
        }
      }  
    }
    
    QueueingConsumer.Delivery tintdelivery = Motionconsumer.nextDelivery();
    String tintmessage = new String(tintdelivery.getBody());
    println(" [x] JOBBIEReceived '" + tintmessage + "'");
    json = parseJSONObject(tintmessage);
    int x = json.getInt("x");
    int y = json.getInt("y");
    int z = json.getInt("z");
    println(x,y,z);
    tint(convNumber(x),convNumber(y),convNumber(z));
    //tint(r,g,b);
  }
  catch (InterruptedException e)
  { 
    println("Ouch! vbur ");
  }
}

int convNumber(int num) {
  //println("GOT A NUM! " + num);
  float newnum = ((num - 200.0) / 200.0) * 255;
  int newnum2 = floor(newnum) % 255;
  println("NEWNUM! " + newnum2);
  return newnum2;
}

