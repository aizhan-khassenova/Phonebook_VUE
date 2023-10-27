<template>
    <div>
        <Header></Header>
        <section>
            <div class="container">
                <Title title="Телефоны"></Title>

                <div class="row" id="table_container">
                    <div class="col-12">
                        <div v-if="data">
                            <table>
                                <tbody>
                                    <tr v-for="(phone, index) in data" :key="index">
                                        <td>
                                            <div id="first_column_container">
                                                <div id="sort_name_container">
                                                    <h6 v-if="phone.owner_Name" id="sort_icon">
                                                        <strong>
                                                            {{ phone.owner_Name.charAt(0) }}
                                                        </strong>
                                                    </h6>

                                                    <h4>
                                                        <strong>
                                                            {{ phone.owner_Name }}
                                                        </strong>
                                                    </h4>
                                                </div>

                                                
                                            </div>
                                        </td>

                                        <td>
                                            <ul id="no-bullets-list">
                                                <li v-for="(phone, pIndex) in phone.phones" :key="pIndex">
                                                    <div id="second_column_container">
                                                        <h6>
                                                            <i class="bi bi-telephone-fill" id="i-list" v-if="phone"></i>
                                                        </h6>

                                                        <h6>
                                                            <strong>
                                                                {{ phone ? phone.phone_Number : 'Нет телефонов' }}
                                                            </strong>
                                                        </h6>
                                                        
                                                    </div>
                                                </li>
                                            </ul>

                                            <div class="btn-group dropend">
                                                    <button class="btn btn-primary dropdown-toggle" type="button"
                                                        data-bs-toggle="dropdown" aria-expanded="false" id="btn-menu">
                                                        <i class="bi bi-three-dots-vertical" id="i-menu"></i>
                                                    </button>

                                                    <ul class="dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                                                        <li>
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-update" id="dropdown-upd"
                                                                @click="prepareUpdate(city.city_ID)" href="#">
                                                                <i class="bi bi-pen-fill" id="i-dropdown"></i>
                                                                Обновить город
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <hr class="dropdown-divider">
                                                        </li>

                                                        <li>
                                                            <a class="dropdown-item rounded-2" data-bs-toggle="modal"
                                                                data-bs-target="#modal-delete" id="dropdown-del"
                                                                @click="prepareUpdate(city.city_ID)" href="#">
                                                                <i class="bi bi-trash-fill" id="i-dropdown"></i>
                                                                Удалить город
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer></Footer>

        <ModalCreate @item-added="onPhoneAdded" title="Добавить контакт" inputLabel="Введите имя и телефон контакта:" apiEndpoint="phone"></ModalCreate>
    </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';
import Header from '@/components/Header.vue';
import Title from '@/components/Title.vue';
import Footer from '@/components/Footer.vue';
import ModalCreate from '@/components/ModalCreate.vue';

export default {
    data() {
        return {
            data: null, // Инициализируем переменную для хранения данных
            newPhoneName: '', // Добавьте новое поле для хранения названия нового города
            updatedPhoneId: null, // Добавляем поле для хранения идентификатора обновляемого города
            alertMessage: null, // Добавьте переменную для хранения сообщения
        };
    },

    components: {
        Header,
        Title,
        Footer,
        ModalCreate,
    },

    mounted() {
        // Вызываем fetchData при загрузке компонента
        this.fetchData();
    },

    methods: {
        fetchData() {
            axios.get('https://localhost:5001/api/phone') // Выполняем GET-запрос к серверу
                .then(response => {
                    // const sortedData = response.data.map(phone => {
                    //     phone.phones = phone.phones.sort((a, b) => {
                    //         const phoneNumberA = parseInt(a.phone_Number, 10);
                    //         const phoneNumberB = parseInt(b.phone_Number, 10);
                    //         return phoneNumberA - phoneNumberB;
                    //     });
                    //     return phone;
                    // });

                    // this.data = sortedData.sort((a, b) => a.phone_Number.localeCompare(b.phone_Number));
                    this.data = response.data;
                })

                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса:', error); // Выводим ошибку в случае неудачи
                })
        },

        onPhoneAdded(newCity) {
            // Обновляем список городов после добавления нового города
            this.data.push(newCity);
            this.fetchData(); // Запрашиваем актуальные данные с сервера
        },
    }
}
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/city.css"></style>

<style scoped>
#table_container {
    padding: 50px 0;
}

#first_column_container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

#sort_name_container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /* border: 1px solid black; */
}

#sort_icon {
    margin-right: 30px;
    text-align: center;
    width: 30px;
    height: 30px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary-color);
    line-height: 30px;
}

#no-bullets-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

#second_column_container {
    display: flex;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;
}

#i-list {
    color: var(--primary-color);
    margin-right: 10px;
}
</style>