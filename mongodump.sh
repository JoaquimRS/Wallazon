#!/bin/bash
for f in /db_dump/categories.bson /db_dump/comments.bson /db_dump/products.bson /db_dump/users.bson
do 
    mongorestore --db wallazon $f
done