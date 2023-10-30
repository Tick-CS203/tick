import pandas as pd
import pickle
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
df2 = df2[:50000]

# vectorise tags
vectorizer = TfidfVectorizer()
vectorized = vectorizer.fit_transform(df2['tag'])
similarities = cosine_similarity(vectorized)

# matrix of similarities
df3 = pd.DataFrame(similarities, columns=df2['artist'], index=df2['artist']).reset_index()

with open('./pickle/cosine_similarity_matrix.pkl', 'wb') as file:
    pickle.dump(df3, file)