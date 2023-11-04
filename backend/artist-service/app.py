from flask import Flask, render_template, request, jsonify, abort
import pandas as pd
import pickle

app = Flask(__name__)

@app.route('/artist')
def index():
    return render_template('index.html')

@app.route('/artist/all')
def get_artists():
    try: 
        with open('./pickle/top_10_similar_artists.pkl', 'rb') as file:
            top_10 = pickle.load(file)

        return jsonify(top_10.index.tolist())
    except FileNotFoundError:
        abort(404, "Pickle file not found")

@app.route('/artist/recommend', methods=['POST'])
def get_recommendations():
    input_artist = request.form.get('artist')
    if not input_artist:
        return jsonify({'error': 'Please provide an artist name in the POST request body'})
    
    input_artist_lower = input_artist.lower()

    try: 
        with open('./pickle/top_10_similar_artists.pkl', 'rb') as file:
            top_10 = pickle.load(file)

            if input_artist_lower not in top_10.index:
                abort(404, "Artist not in database")

    except FileNotFoundError:
        abort(404, "Pickle file not found")
    
    return jsonify(top_10.loc[input_artist_lower].tolist())

if __name__ == "__main__":
    app.run(debug=True)