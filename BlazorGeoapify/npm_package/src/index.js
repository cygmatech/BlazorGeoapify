import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';

const autocomplete = new GeocoderAutocomplete(
    document.getElementById("autocomplete"),
    'YOUR_API_KEY',
    { placeholder: "Digite aqui um endereço" });

autocomplete.on('select', (location) => {

});

autocomplete.on('suggestions', (suggestions) => {

});