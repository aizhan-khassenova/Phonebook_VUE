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
                            <li v-for="(city, index) in data" :key="city.city_ID">
                                <div v-if="data && index !== 0" class="line-data"></div>

                                <span v-if="city.city_Name !== null && city.city_Name !== 0">
                                    <button @click="toggleCity(city)"
                                        v-if="city.streets && city.streets.filter(street => street.street_Name !== null).length > 0"
                                        type="button" class="btn btn-primary">
                                        <i v-if="city.expanded" class="bi bi-caret-down-fill"></i>

                                        <i v-else class="bi bi-caret-right-fill"></i>
                                    </button>

                                    <h6 v-else id="sort_icon">
                                        <strong><i class="bi bi-geo-alt-fill"></i></strong>
                                    </h6>

                                    <div class="line-hor"></div>

                                    <h4>
                                        <strong>{{ city.city_Name }}</strong>
                                    </h4>
                                </span>

                                <ul v-if="city.expanded">
                                    <li v-for="street in city.streets" :key="street.street_ID">
                                        <div v-if="city.expanded" class="line-city"></div>

                                        <span v-if="street.street_Name !== null && street.street_Name !== 0">
                                            <button @click="toggleStreet(street)"
                                                v-if="street.houses && street.houses.filter(house => house.house_Number !== 0).length > 0"
                                                type="button" class="btn btn-primary btn-street">
                                                <i v-if="street.expanded" class="bi bi-caret-down-fill"></i>

                                                <i v-else class="bi bi-caret-right-fill"></i>
                                            </button>

                                            <h6 v-else id="sort_icon" class="btn-street">
                                                <strong><i class="bi bi-signpost-fill"></i></strong>
                                            </h6>

                                            <div class="line-hor"></div>

                                            <h6>
                                                <strong>{{ street.street_Name }}</strong>
                                            </h6>
                                        </span>

                                        <ul v-if="street.expanded">
                                            <li v-for="house in street.houses" :key="house.house_ID">
                                                <div v-if="street.expanded" class="line-street"></div>

                                                <span v-if="house.house_Number !== null && house.house_Number !== 0">
                                                    <button @click="toggleHouse(house)" 
                                                        v-if="house.apartments && house.apartments.filter(apartment => apartment.apartment_Number !== 0).length > 0"
                                                        type="button" class="btn btn-primary btn-house">

                                                        <i v-if="house.expanded" class="bi bi-caret-down-fill"></i>
                                                        <i v-else class="bi bi-caret-right-fill"></i>
                                                    </button>

                                                    <h6 v-else id="sort_icon" class="btn-house">
                                                        <strong><i class="bi bi-house-door-fill"></i></strong>
                                                    </h6>

                                                    <div class="line-hor"></div>

                                                    <h6>
                                                        <strong>{{ house.house_Number }}</strong>
                                                    </h6>
                                                </span>

                                                <ul v-if="house.expanded">
                                                    <li v-for="apartment in house.apartments" :key="apartment.apartment_ID">
                                                        <div v-if="house.expanded" class="line-house"></div>

                                                        <span v-if="apartment.apartment_Number !== null && apartment.apartment_Number !== 0">
                                                            <button @click="toggleApartment(apartment)"
                                                                v-if="apartment.phones && apartment.phones.filter(phone => phone.owner_Name !== null).length > 0"
                                                                type="button" class="btn btn-primary btn-apartment">
                                                                <i v-if="apartment.expanded"
                                                                    class="bi bi-caret-down-fill"></i>

                                                                <i v-else class="bi bi-caret-right-fill"></i>
                                                            </button>

                                                            <h6 v-else id="sort_icon" class="btn-apartment">
                                                                <strong><i class="bi bi-key-fill"></i></strong>
                                                            </h6>

                                                            <div class="line-hor"></div>

                                                            <h6>
                                                                <strong>{{ apartment.apartment_Number }}</strong>
                                                            </h6>
                                                        </span>

                                                        <ul v-if="apartment.expanded">
                                                            <li v-for="phone in apartment.phones" :key="phone.phone_ID">
                                                                <div v-if="apartment.expanded" class="line-apartment"></div>

                                                                <span v-if="phone.owner_Name !== null && phone.owner_Name !== 0">
                                                                    <button @click="togglePhone(phone)" type="button" class="btn btn-primary btn-owner">
                                                                        <i v-if="phone.expanded"
                                                                            class="bi bi-caret-down-fill"></i>

                                                                        <i v-else class="bi bi-caret-right-fill"></i>
                                                                    </button>

                                                                    <div class="line-hor"></div>

                                                                    <h6>
                                                                        <strong>{{ phone.owner_Name }}</strong>
                                                                    </h6>
                                                                </span>

                                                                <div v-if="phone.expanded" class="line-phone"></div>

                                                                <span v-if="phone.expanded" id="phone">
                                                                    <h6 id="sort_icon" class="btn-phone">
                                                                        <strong><i
                                                                                class="bi bi-telephone-fill"></i></strong>
                                                                    </h6>

                                                                    <div class="line-hor"></div>

                                                                    <h6>
                                                                        <strong>{{ phone.phone_Number }}</strong>
                                                                    </h6>
                                                                </span>
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
                .get('http://localhost:5001/api/phonebook/listByCity')
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

        togglePhone(phone) {
            phone.expanded = !phone.expanded;
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
}

ul,
li {
    list-style: none;
    padding: 0;
    color: var(--black-color);
}

.btn-street {
    margin-left: 70px;
}

.btn-house {
    margin-left: 140px;
}

.btn-apartment {
    margin-left: 210px;
}

.btn-owner {
    margin-left: 280px;
}

.btn-phone {
    margin-left: 350px;
}

.line-phone {
    height: 30px;
    width: 2px;
    background-color: var(--bs-border-color);
    margin-left: 366px;
}

.line-apartment {
    height: 30px;
    width: 2px;
    background-color: var(--bs-border-color);
    margin-left: 296px;
}

.line-house {
    height: 30px;
    width: 2px;
    background-color: var(--bs-border-color);
    margin-left: 226px;
}

.line-street {
    height: 30px;
    width: 2px;
    background-color: var(--bs-border-color);
    margin-left: 156px;
}

.line-city {
    height: 30px;
    width: 2px;
    background-color: var(--bs-border-color);
    margin-left: 86px;
}

.line-data {
    height: 30px;
    width: 2px;
    background-color: var(--bs-border-color);
    margin-left: 16px;
}

.line-hor {
    height: 2px;
    width: 30px;
    margin-right: 10px;
    background-color: var(--bs-border-color);
}

h4,
h6 {
    display: flex;
    align-items: center;
}
</style>