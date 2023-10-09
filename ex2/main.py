import pandas as pd
import asyncio as aio
from aiohttp import ClientSession
from countries import Countries


async def get_dataframe():
    async with ClientSession() as session:
        countries = Countries(session)
        data = await countries.subregion('Northern Europe', {
            "fields": ['name', 'currencies', 'population']
        })

        # Flatten the JSON data
        df = pd.json_normalize(data)

        # Filter only the columns with currency name, aggregate the columns dropping missing values, convert to a list
        # and get the first element of the list. Then add this as a new column called `currency_name`
        df['currency_name'] = df.filter(
            regex='currencies\.([A-Z]+)\.name').agg(lambda x: x.dropna().tolist()[0], axis="columns")

        # Filter the columns we want
        df = df.loc[:, ['name.official', 'currency_name', 'population']]

        # Rename `name.official` to `nation_official_name`
        df = df.rename(columns={'name.official': 'nation_official_name'})

        return df


if __name__ == "__main__":
    async def __main():
        df = await get_dataframe()
        print(df)

    aio.run(__main())
