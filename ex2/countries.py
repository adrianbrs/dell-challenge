import aiohttp
import os
import urllib.parse as urlparse
from typing import Any

default_api_url = os.environ.get(
    'BASE_API_URL', 'https://restcountries.com/v3.1')


class Countries:
    def __init__(self, session: aiohttp.ClientSession, api_url: str = default_api_url):
        self.session = session
        self.api_url = api_url

    def get_url(self, path: str) -> str:
        return urlparse.urljoin(f'{self.api_url}/', path)

    async def subregion(self, subregion: str, params: dict[str, Any] = {}):
        url = self.get_url(f'subregion/{urlparse.quote(subregion)}')
        async with self.session.get(url, params=params) as response:
            return await response.json()
