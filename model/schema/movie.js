const {Schema} = require('mongoose')
const movie = new Schema({	
    'id': String,
    'title': String,
    'year': String,
    'rating': Schema.Types.Mixed,
    'reviews_count': Number,
    'countries': Array,
    'summary':String,
    'images':Schema.Types.Mixed,
    'trailers': [Schema.Types.Mixed],
    'image_save_path': String,
    'original_title': String,
    'blooper_urls': Array,
    'alt': String,
    'pubdate': String,
    'writers':[Schema.Types.Mixed],
    'pubdates': Array,
    'durations': Array,
    'trailer_urls': Array,
    'bloopers':[Schema.Types.Mixed],
    'website': String,
    'popular_reviews': [Schema.Types.Mixed]
})



exports.movie = movie
