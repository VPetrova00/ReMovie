import sqlite3
from urllib.request import urlopen
from bs4 import BeautifulSoup
import datetime
import re


def scraper():
    # url = "https://www.imdb.com/search/title/?genres=action&count=250&view=advanced"
    url = 'https://www.imdb.com/search/title/?genres=action&count=250&start=251&ref_=adv_nxt'

    response = urlopen(url)
    soup = BeautifulSoup(response, "html.parser")

    movies = []
    genres = set()
    movie_genre = []

    for movie in soup.find_all("div", class_="lister-item-content"):
        try:
            title = movie.find("h3", class_="lister-item-header").a.text
            summary = movie.select("p.text-muted")[1].text.strip()
            raw_release_date = movie.find("span", class_="lister-item-year text-muted unbold")
            if raw_release_date:
                release_date = raw_release_date.text.strip("(II) () ")

                if re.search(r'[a-zA-Z]+', release_date):
                    continue

                if int(release_date.split('–')[0]) >= 2023 or (len(release_date) == 4 and release_date == '2023'):
                    continue

                if len(release_date) == 5:
                    # Release date has only year information
                    release_date = f"{release_date.split('–')[0]}-01-01"
                elif len(release_date) == 9:
                    release_date = f"{release_date.split('–')[1]}-01-01"
                else:
                    release_date = f"{release_date}-01-01"
            else:
                release_date = ""
            rating = movie.find("div", class_="ratings-bar").find("strong").text
            genre = movie.find("span", class_="genre").text.strip()
            movies.append([title, summary, rating, release_date])
            for g in genre.split(","):
                genres.add(g.strip())
                movie_genre.append((title, g.strip()))
        except Exception:
            continue

    conn = sqlite3.connect(
        'C:\\Users\\Vesela\\Documents\\Uni\\Fourth year - 2022-2023\\IntroductionToPython\\Final project\\final-project\\ReMovie\\ReMovie - backend\\db.sqlite3')
    c = conn.cursor()

    for i, movie_entry in enumerate(movies):
        date = movie_entry[3].split('-')

        c.execute("INSERT INTO backend_movie VALUES (?, ?, ?, ?, ?)",
                  (i + 221, movie_entry[0], movie_entry[1], float(movie_entry[2]),
                   datetime.date(int(date[0]), int(date[1]), int(date[2]))))

    for i, genre in enumerate(genres):
        c.execute("INSERT INTO backend_genre VALUES (?, ?)", (i + 19, genre))

    movie_ids = dict(c.execute("SELECT movie_title, movie_id FROM backend_movie").fetchall())
    genre_ids = dict(c.execute("SELECT genre_name, id FROM backend_genre").fetchall())

    for index, (movie, genre) in enumerate(movie_genre):
        try:
            c.execute("INSERT INTO backend_movie_movie_genres VALUES (?, ?, ?)",
                     (index + 637, movie_ids[movie], genre_ids[genre]))
        except Exception:
            continue

    conn.commit()
    conn.close()


if __name__ == "__main__":
    scraper()
