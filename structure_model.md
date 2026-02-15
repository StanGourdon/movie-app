Users:
id
name
email

Movies:
id
title
description
release_date
img_url

Comments:
id
user_id (FK)
movie_id (FK)
content
created_at

Likes:
id
user_id (FK)
movie_id (FK)

Stars (ratings):
id
user_id (FK)
movie_id (FK)
rating (1 à 5)