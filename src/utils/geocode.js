const request = require('postman-request')

const geocode = (address, callback) => {
    const url = (
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
        encodeURIComponent(address) + '.json?' +
        'access_token=pk.eyJ1Ijoia3YwaWQiLCJhIjoiY2tsN3htYXRjMXdvbzJxcW16MmR3ZHJseSJ9.6CLhBr27FgX_4EVbWNZqFw' +
        '&limit=1'
    )

    request({url, json: true}, (error, {body}) => {

        if(error){
            callback('Can\'t establish connection.')
        } else if (body.features.length === 0){
            callback('No such location found.')
        } else{
            const subject = body.features[0]
                
            callback(undefined, {
                longitude: subject.center[0],
                latitude: subject.center[1],
                location: subject.place_name
        
            })
        }
    
    
    })
}

module.exports = (
    geocode
)