import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;


public class ThreadPoolDispatcher implements Dispatcher {

	static final String NUMTHREADS =  "8";
	static final String THREADPROP = "Thtreads";
	
	private int numThreads;
	
	public ThreadPoolDispatcher() {
		numThreads = Integer.parseInt(System.getProperty(THREADPROP, NUMTHREADS));
	}
	
	private void dispatchLoop(ServerSocket serverSocket, HandleMap handleMap){
			while(true){
				try{
					Socket socket = serverSocket.accept();
					Runnable demultiplexer = new Demultiplexer(socket,  handleMap);
					demultiplexer.run();
					
				} catch(IOException e){
					e.printStackTrace();
				}
				
			}
		
	}
	
	@Override
	public void dispatch(ServerSocket serverSocket, HandleMap handleMap) {
		for(int i = 0 ; i < (numThreads -1); i++){
			Thread thread = new Thread(){
				public void run(){
					dispatchLoop(serverSocket, handleMap);					
				}
				
			};
			thread.start();
			System.out.println("Created and started Thread = "+thread.getName());
					
		}
		System.out.println("Iterative server starting in main thread" + Thread.currentThread().getName());
		
		dispatchLoop(serverSocket, handleMap);
		
	}

}
