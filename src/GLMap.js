import React from 'react'

// ES6
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A',
  interactive: false
})

const GLMap = () => (
  <Map
    style='mapbox://styles/mapbox/light-v9' // eslint-disable-line
    containerStyle={{
      paddingTop: '75%',
      width: '100%'
    }}
    center={[-73.9815, 40.6892]}
    zoom={[16]}
  >

    <Layer type='fill' paint={{
      'fill-color': 'steelblue',
      'fill-opacity': 0.5
    }}>
      <Feature coordinates={[
        [
          [
            -73.98202747106552,
            40.68934325788127
          ],
          [
            -73.98120671510696,
            40.68876362235082
          ],
          [
            -73.98093044757842,
            40.68908903239214
          ],
          [
            -73.98198992013931,
            40.6893819000707
          ],
          [
            -73.98202747106552,
            40.68934325788127
          ]
        ]
      ]}
      />
    </Layer>
    <Layer type='symbol' id='marker' layout={{ 'icon-image': 'marker-15' }}>
      <Feature coordinates={[-73.982046, 40.689373]} />
    </Layer>
  </Map>
)

export default GLMap
