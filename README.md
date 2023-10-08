# Dell Challenge

[Original challenge specification document](SE%20Challenge_24_08_2023.docx.pdf)

## Exercise 1

**Languages**: HTML, CSS, JavaScript

Create a Web Page that looks as similar as possible to the screenshot below.\
It should be possible to add a new Filter element in the “Filters” section, using the text input field and the <img src="docs/image2.png" alt="PLUS" height="28px" /> button.\
When the filter elements are too many, a scrollbar will appear on the right side.\
You can also delete each Filter element by clicking the <img src="docs/image4.png" alt="CLOSE" height="28px" /> button next to them.\
You can use HTML, CSS, vanilla JavaScript, jQuery, Bootstrap or any other styling library and framework.

<img src="docs/image3.png" alt="Screenshot of the page" width="auto" height="auto" />

### Questions

1. How would you deploy this web page so that users can access it online? Talk about the infrastructure, the resources, and the technologies needed.\
   **This webpage is designed for deployment on static website hosting. Since we don't rely on server-side rendering technologies like PHP, JSP, or Node.js, hosting it on a Content Delivery Network (CDN) is sufficient. The CDN serves static files to clients with the necessary headers. Any dynamic content is fetched through API calls from the client.**

   **However, it's important to note that we don't include file content hashes in our filenames. This limits our ability to implement strong, long-term caching on the client side. To mitigate this, depending on the hosting service, we can configure cache headers using techniques like ETags or last modified dates. This ensures that clients may still make requests for content, but the server can choose to respond with a 'not modified' status and let the client use its locally cached version.**

   **For improved overall page load performance and SEO, we could consider server-side rendering for dynamic content, along with the use of a bundler to add content hashes to static filenames. However, implementing these enhancements would also require a more robust infrastructure capable of running a web server with technologies like Node.js or PHP.**

2. How would you modify the code in order to populate the dropdown menu with values coming from a database? Talk about possible database solutions, and how the backend can interact with the frontend.\
   **ANSWER**

## Exercise 2

**Languages**: Python

Use the following public REST API.\
https://restcountries.com/

Get data only for Northern European countries, and filter only for the following fields:\
`name`\
`currencies`\
`population`

The API call should be asynchronous and encapsulated in a function.

Load the JSON response into a dictionary and then turn it into a single index Pandas dataframe.\
The columns should be `nation_official_name`, `currency_name` and `population`.

The dataframe should look like this:

<img src="docs/image6.png" alt="Dataframe example" width="auto" height="auto" />

then connect to a hypothetical Postgres Database and load the dataframe to a new table, in REPLACE mode.

### Questions

1. If you didn’t know the structure of the JSON, and there was an arbitrary level of nesting of arrays and dictionaries, how would you need to change the code to dynamically unnest the data into a single-indexed dataframe?\
   **ANSWER**

2. If you had to scale this application to read and load data for hundreds of countries and refresh the database every few minutes, what strategies could be used in terms of coding patterns, technologies, resources and infrastructure?\
   **ANSWER**

## Exercise 3

**Languages**: Python

Scrape the S&P 500 companies table from the following Wikipedia page:\
https://en.wikipedia.org/wiki/List_of_S%26P_500_companies

Save the companies ticker symbols into a list. Cut the list to take only the first 50 elements.

For each ticker symbol in the list, call the following API In order to get the Previous Close value for each company:\
https://finance.yahoo.com/quote/AAPL?p=AAPLtsrc=fin-srch\
Save this value and the ticker symbol in a Pandas dataframe.

For each ticker symbol also call the following API endpoint in order to get the 200-Day Moving Average value:\
https://finance.yahoo.com/quote/AAPL/key-statistics?p=AAPL
Save this value in a new column of the same dataframe.

Compute a new column in the dataframe called `is_cheap` with a Boolean value which is True if the Previous Close is lower than the 200-Day Moving Average and False otherwise.

Example:

<img src="docs/image5.png" alt="Dataframe example" width="auto" height="auto" />

Concatenate all dataframes for all ticker symbols in one.

Display the dataframe on a plot only for the companies where is_cheap = True.
On the X axis should be the Ticker symbol and on the Y axis the Previous Close value.

<img src="docs/image1.png" alt="Dataframe plot example" width="auto" height="auto" />

### Questions

1. If the Wikipedia table was lazy loaded, and only appeared after a few seconds from opening the page, what libraries and strategies could you adopt to get the data?\
   **ANSWER**

2. If you had to run this script for thousands of companies instead of 500, what kind of patterns, libraries and/or optimization techniques could you use to keep the process efficient?\
   **ANSWER**
