<template>
    <div>
        <Loader v-if="loading"></Loader>

        <Header></Header>

        <section v-if="!loading">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="col-3" id="title_container">
                            <h1 class="text-start text-primary">
                                <strong>Навигация</strong>
                            </h1>
                        </div>
                    </div>
                </div>

                <div class="row" id="table_container">
                    <div class="col-12">
                        <ul>
                            <li v-for="city in data" :key="city.city_ID">
                                <span @click="toggleCity(city)">
                                    <button type="button" class="btn btn-primary">
                                        <i v-if="city.expanded" class="bi bi-caret-down-fill"></i>
                                        <i v-else class="bi bi-caret-right-fill"></i>
                                    </button>
                                    <h4>
                                        <strong>{{ city.city_Name }}</strong>
                                    </h4>
                                </span>

                                <ul v-if="city.expanded">
                                    <li v-for="street in city.streets" :key="street.street_ID">
                                        <span @click="toggleStreet(street)">
                                            <button type="button" class="btn btn-primary" id="btn-street">
                                                <i v-if="street.expanded" class="bi bi-caret-down-fill"></i>
                                                <i v-else class="bi bi-caret-right-fill"></i>
                                            </button>
                                            <h6>
                                                <strong>{{ street.street_Name }}</strong>
                                            </h6>
                                        </span>

                                        <ul v-if="street.expanded">
                                            <li v-for="house in street.houses" :key="house.house_ID">
                                                <span @click="toggleHouse(house)">{{ house.house_Number }}</span>

                                                <ul v-if="house.expanded">
                                                    <li v-for="apartment in house.apartments" :key="apartment.apartment_ID">
                                                        <span @click="toggleApartment(apartment)">{{
                                                            apartment.apartment_Number }}</span>

                                                        <ul v-if="apartment.expanded">
                                                            <li v-for="phone in apartment.phones" :key="phone.phone_ID">
                                                                {{ phone.owner_Name }} - {{ phone.phone_Number }}
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <Footer v-if="!loading"></Footer>
    </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Loader from '@/components/Loader.vue';

export default {
    data() {
        return {
            data: null,
            loading: true,
        };
    },

    components: {
        Header,
        Footer,
        Loader,
    },

    mounted() {
        setTimeout(() => {
            this.fetchData();
        }, 100);
    },

    methods: {
        fetchData() {
            axios
                .get('https://localhost:5001/api/phonebook/listByCity')
                .then((response) => {
                    this.data = response.data.map((city) => ({
                        ...city,
                        expanded: false,

                        streets: city.streets.map((street) => ({
                            ...street,
                            expanded: false,

                            houses: street.houses.map((house) => ({
                                ...house,
                                expanded: false,

                                apartments: house.apartments.map((apartment) => ({
                                    ...apartment,
                                    expanded: false,
                                })),
                            })),
                        })),
                    }));
                })

                .catch((error) => {
                    console.error('Ошибка при выполнении GET запроса:', error);
                })

                .finally(() => {
                    this.loading = false;
                });
        },

        toggleCity(city) {
            city.expanded = !city.expanded;
        },

        toggleStreet(street) {
            street.expanded = !street.expanded;
        },

        toggleHouse(house) {
            house.expanded = !house.expanded;
        },

        toggleApartment(apartment) {
            apartment.expanded = !apartment.expanded;
        },
    },
};
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/style.css"></style>

<style scoped>
button {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-right: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}

i {
    display: flex;
    justify-content: center;
    align-items: center;
}

span {
    display: flex;
    align-items: center;
    padding-top: 25px;
    padding-bottom: 25px;
}

ul, li{
    list-style: none;
    padding: 0;
    color: var(--black-color);
}

#btn-street{
    margin-left: 70px;
}
</style>