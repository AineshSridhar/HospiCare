<template>
  <div>
    <div ref="map" class="map" style="height: 500px; width: 100%;"></div>
    <div v-if="hospitals.length > 0" class="hospital-list">
      <h1 style="margin:20px auto 80px">Nearby Hospitals</h1>
      <div class="hospital-grid">
        <div v-for="(hospital, index) in hospitals" :key="index" class="hospital-item">
          <div class="hospital-name">{{ hospital.name }}</div>
          <div class="hospital-location">{{ hospital.address }}</div>
          <div class="hospital-phone">{{ hospital.phone || 'No phone number available' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  data() {
    return {
      hospitals: [], // To store the hospital details
    };
  },
  mounted() {
    // Create the script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDkGrXaoHMYFOEvFO6ibbVQqmU1xUd4UXk&loading=async&libraries=places&callback=initMap`;
    script.async = true; // Load asynchronously
    script.defer = true; // Defer execution of the script

    // Attach the initMap function to the window object
    window.initMap = () => {
      // Create a map centered at a default location
      const map = new google.maps.Map(this.$refs.map, {
        center: { lat: -34.397, lng: 150.644 }, // Default coordinates
        zoom: 15, // Adjust the zoom level
      });

      // Try to get the user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Set the map center to the user's location
            map.setCenter(userLocation);

            // Create a marker for the user's location
            new google.maps.Marker({
              position: userLocation,
              map: map,
              title: "You are here!",
            });

            // Search for nearby hospitals
            const service = new google.maps.places.PlacesService(map);
            service.nearbySearch(
              {
                location: userLocation,
                radius: 5000, // Search within 5 km radius
                type: ['hospital'], // Search for hospitals
              },
              (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  results.forEach((place) => {
                    // For each hospital, fetch additional details (like address and phone number)
                    service.getDetails({ placeId: place.place_id }, (placeDetails, status) => {
                      if (status === google.maps.places.PlacesServiceStatus.OK) {
                        // Store detailed information about the hospital
                        this.hospitals.push({
                          name: placeDetails.name,
                          address: placeDetails.formatted_address,
                          phone: placeDetails.formatted_phone_number || 'N/A',
                        });

                        // Add a marker for the hospital
                        new google.maps.Marker({
                          position: placeDetails.geometry.location,
                          map: map,
                          title: placeDetails.name,
                        });
                      }
                    });
                  });
                } else {
                  console.error("Places API request failed: " + status);
                }
              }
            );
          },
          () => {
            handleLocationError(true, map);
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map);
      }
    };

    // Append the script to the document body
    document.body.appendChild(script);
  }
};

// Handle location errors
function handleLocationError(browserHasGeolocation, map) {
  const infoWindow = new google.maps.InfoWindow({
    map: map,
  });
  infoWindow.setPosition(map.getCenter());
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
}
</script>

<style scoped>
.map {
  height: 500px; /* Set height for the map */
  width: 100%; /* Set width for the map */
}

.hospital-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
}

.hospital-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
  gap: 15px; /* Space between grid items */
  width: 100%;
}

.hospital-item {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.hospital-name {
  font-weight: bold;
  font-size: 1.1em;
  margin-bottom: 5px;
}

.hospital-location {
  color: #555;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.hospital-phone {
  color: #777;
  font-size: 0.8em;
}
</style>
