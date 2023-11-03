from flask import Flask, render_template, request, jsonify
import pandas as pd
import pickle

app = Flask(__name__)

@app.route('/artist')
def index():
    return render_template('index.html')

@app.route('/artist/all')
def get_artists():
    try: 
        with open('./pickle/cosine_similarity_matrix.pkl', 'rb') as file:
            cosine_sim = pickle.load(file)
            df = pd.DataFrame(cosine_sim)['artist']

        return jsonify(df.values.tolist())
    except FileNotFoundError:
        return "Pickle file not found"
    except Exception as e:
        return f"An error occurred: {str(e)}"

@app.route('/artist/recommend', methods=['POST'])
def get_recommendations():
    input_artist = request.form.get('artist')
    if not input_artist:
        return jsonify({'error': 'Please provide an artist name in the POST request body'})
    
    input_artist_lower = input_artist.lower()

    try: 
        with open('./pickle/cosine_similarity_matrix.pkl', 'rb') as file:
            cosine_sim = pickle.load(file)

            recommendations = pd.DataFrame(cosine_sim.nlargest(11, input_artist_lower)['artist'])
            recommendations = recommendations[recommendations['artist'] != input_artist_lower]
    except FileNotFoundError:
        return "Pickle file not found"
    except Exception as e:
        return f"An error occurred: {str(e)}"
    
    return jsonify(recommendations.values.flatten().tolist())

if __name__ == "__main__":
    app.run(debug=True)