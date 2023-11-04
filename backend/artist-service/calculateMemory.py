import pickle
import sys

# Load the pickled object
with open('./pickle/top_10_similar_artists.pkl', 'rb') as file:
    loaded_object = pickle.load(file)

# Calculate the approximate memory usage
memory_usage = sys.getsizeof(loaded_object)
print(f"Approximate memory usage: {memory_usage} bytes")