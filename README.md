Features in the Application:

1. Price Prediction : This feature predicts the closing price of the coming day using machine learning. It is fed years of data using Quandl's dataset for a specific company and using the data set, a neural net trains itself. The program asks for the current day's opening price, low and high and using these data and the dataset trained, it tries to predict the closing day price.

Inputs Provided: 
	1. Company's name. The name should be given as company's name on the stock, 	eg Google is GOOGL, Facebook is FB. I have tried the prediction with GOOGL, 	FB & ABBV. 

	2. Open: Enter here the current day's opening price of the stock.

	3. High :  Enter here the current day's high price of the stock.

	4. Low : Enter here the current day's low price of the stock.

Output Provided:
	The prediction of the closing price of the day.

2. Plot the graph of the stock price : Using Quandl's dataset, historical prices are saved and then using the Plotly API, those prices are placed on a graph against the datestamp

Input Provided : Company's name. The name should be given as company's name on the 		stock, 	eg Google is GOOGL, Facebook is FB. I have tried the prediction 		with GOOGL,  FB & ABBV. 

Output Provided : A link is given. Clicking on the link gives us a line graph of the price vs datestamp

3. Get the current price of the stock in real time : Using Google's Finance API, the current price in real time of the given stock is given as output

Input Provided : Company's name. The name should be given as company's name on the 		  stock, eg Google is GOOGL, Facebook is FB. I have tried the  prediction 		   with GOOGL,  FB & ABBV. 
Output Provided : Price of the given stock in real-time

API's Used:

1. FANN : Library used to implement Artificial Neural Networks
2. Request : Used to get json file from the URL provided
3. Stdio : Library used to provide user inputs in a Node JS console application
4. Plotly : Used to render graphs. A link is provided as output. The link shows the      rendered graph
5.  Quandl Dataset : To get historical prices of a stock
6.  Google's Financial API : To get the quotes of a stock in real-time

Installation Instructions:

Linux:

The application works on NodeJS & NPM package manager. I have used the IDE Webstorm for this project, although that is not required for the application to run.
1. Get NodeJS and install in your system. Follow the instructions from http://nodejs.org/ according to your OS and build it.
2. Install the library FANN using instructions here https://github.com/libfann/fann
3. Install FANN, you will need to install glib2 and pkg-config before that.
4. Using the NPM package manager (comes preinstalled with Node JS), download the following packages:
	FANN
	Request
	Stdio
	Plotly
	
5. After installing the above packages using NPM manager, run the above script. When running, first the app asks for which company the user wants to check features for.










