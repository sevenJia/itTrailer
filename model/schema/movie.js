const {Schema} = require('mongoose')
const movie = new Schema({	
    'rating': Schema.Types.Mixed,
    'reviews_count': Number,
    'original_title': String,
    'blooper_urls': Array,
    'images':Schema.Types.Mixed,
    'year': String,
    'alt': String,
    'id': String,
    'pubdate': String,
    'title': String,
    'writers':[Schema.Types.Mixed],
    'pubdates': Array,
    'website': String,
    'durations': Array,
    'trailers': [Schema.Types.Mixed],
    'trailer_urls': Array,
    'bloopers':[Schema.Types.Mixed],
    'countries': Array,
    'popular_reviews': [Schema.Types.Mixed]
})



exports.movie = movie
