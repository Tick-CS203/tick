import pandas as pd
import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# read csv
df = pd.read_csv('./data/mb_export.csv')

# drop rows with NA
df2 = df.dropna()

# process and clean data
def clean(tags):
    tagList = tags.split(" ")
    tagSet = set()
    for tag in tagList:
        if tag != "" and len(tag) >= 3 and len(tag) <= 20:
            tagSet.add(tag)
    
    return " ".join(tagSet)

# get artist name and tags only
df2 = df2[['artist', 'tag']]

# remove duplicate artists
df2['artist'] = df2['artist'].str.lower()
df2 = df2.drop_duplicates(subset=['artist'])

# process tags
df2['tag'] = df2['tag'].str.lower()
df2 = df2.dropna(subset=['tag'])
df2 = df2[df2['tag'].apply(lambda x: isinstance(x, str))]

# make each tag a single word
df2['tag'] = df2['tag'].str.replace(' ', '')
df2['tag'] = df2['tag'].str.replace(';', ' ')

# remove special characters
df2['tag'] = df2['tag'].str.replace(
    r'[^a-z0-9\s]',
    '',
    regex=True,
)

# remove tag duplicates and clean tags
df2['tag'] = df2['tag'].apply(clean)

# limit number of rows (to avoid kernel crashing)
df2 = df2[:100000]

# vectorise tags
vectorizer = TfidfVectorizer()
vectorized = vectorizer.fit_transform(df2['tag'])
similarities = cosine_similarity(vectorized)

# Create an empty DataFrame to store the top 10 similar artists for each artist
top_similar_artists_df = pd.DataFrame(index=df2['artist'], columns=[f"SimilarArtist_{i+1}" for i in range(10)])

# Calculate cosine similarity for each artist compared to other artists in the dataset
for index, row in df2.iterrows():
    artist_name = row['artist']
    artist_tags = row['tag']
    vectorised_artist_tags = vectorizer.transform([artist_tags])
    similarities = cosine_similarity(vectorized, vectorised_artist_tags)

    # Find the top 10 artists for each artist and add it in the dataframe
    similar_indices = np.argsort(similarities.flatten())[:-12:-1]
    similar_artists = df2['artist'].iloc[similar_indices].tolist()[1:]
    top_similar_artists_df.loc[artist_name] = similar_artists

with open('./pickle/top_10_similar_artists.pkl', 'wb') as file:
    pickle.dump(top_similar_artists_df, file)