import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';

export default {
    data() {
        return {
            data: null, // Инициализируем переменную для хранения данных
            newCityName: '', // Добавьте новое поле для хранения названия нового города
            updatedCityId: null, // Добавляем поле для хранения идентификатора обновляемого города
            alertMessage: null, // Добавьте переменную для хранения сообщения
        };
    },

    mounted() {
        // Вызываем fetchData при загрузке компонента
        this.fetchData();
    },

    methods: {
        showAlert(alertMessage, alertType) {
            const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
            const wrapper = document.createElement('div');

            if (alertMessage) {
                const icon = alertType === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill';

                // Удалите слово "Ошибка" из текста уведомления при ошибке
                alertMessage = alertType === 'danger' ? alertMessage.replace('Ошибка: ', '') : alertMessage;

                wrapper.innerHTML = `
                    <div class="alert alert-${alertType} alert-dismissible" role="alert">
                        <div><i class="bi ${icon}" id="i-check"></i>${alertMessage}</div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
                alertPlaceholder.append(wrapper);
            }
            // Добавляем код для автоматического закрытия уведомления через 5 секунд
            setTimeout(() => {
                wrapper.remove(); // Удаляем уведомление из DOM через 5 секунд
            }, 5000);
        },

        fetchData() {
            axios.get('https://localhost:5001/api/city') // Выполняем GET-запрос к серверу
                .then(response => {
                    const sortedData = response.data.map(city => {
                        // Сортируем улицы для каждого города
                        city.streets = city.streets.sort((a, b) => a.street_Name.localeCompare(b.street_Name));
                        return city;
                    });

                    // Сортируем города по имени
                    this.data = sortedData.sort((a, b) => a.city_Name.localeCompare(b.city_Name));
                })

                .catch(error => {
                    console.error('Ошибка при выполнении GET запроса:', error); // Выводим ошибку в случае неудачи
                })
        },

        createCity() {
            this.alertMessage = null; // Сброс сообщения перед выполнением запроса

            const cityData = {
                City_Name: this.newCityName, // Используйте значение из поля ввода
            };

            axios.post('https://localhost:5001/api/city', cityData) // Отправьте POST-запрос
                .then(response => {
                    console.log(response.data);
                    this.data.push(response.data);
                    this.newCityName = '';
                    this.fetchData();
                    this.alertMessage = 'Город добавлен'; // Установите сообщение об успешном добавлении
                    this.showAlert(this.alertMessage, 'success'); // Отображение уведомления с типом 'success'
                })

                .catch(error => {
                    console.error('Ошибка при выполнении POST запроса:', error);
                    this.alertMessage = error.response.data; // Установите сообщение об ошибке из response.data
                    this.showAlert(this.alertMessage, 'danger'); // Отображение уведомления с типом 'danger'
                });
        },

        prepareUpdate(cityId) {
            this.updatedCityId = cityId;
        },

        updateCity() {
            this.alertMessage = null; // Сброс сообщения перед выполнением запроса

            const cityData = {
                City_Name: this.newCityName,
            };

            // Посылаем PUT-запрос на сервер для обновления города
            axios.put(`https://localhost:5001/api/city/${this.updatedCityId}`, cityData)
                .then(response => {
                    console.log(response.data);
                    // Обновляем данные на клиенте
                    this.fetchData();
                    // Сбрасываем значения
                    this.updatedCityId = null;
                    this.newCityName = '';
                    this.alertMessage = 'Город обновлен'; // Установите сообщение об успешном обновлении
                    this.showAlert(this.alertMessage, 'success'); // Отображение уведомления с типом 'success'
                })
                .catch(error => {
                    console.error('Ошибка при выполнении PUT запроса:', error);
                    this.alertMessage = error.response.data; // Установите сообщение об ошибке из response.data
                    this.showAlert(this.alertMessage, 'danger'); // Отображение уведомления с типом 'danger'
                });
        },

        deleteCity() {
            // Посылаем Delete-запрос на сервер для удаления города
            axios.delete(`https://localhost:5001/api/city/${this.updatedCityId}`)
                .then(response => {
                    console.log(response.data);
                    // Обновляем данные на клиенте
                    this.fetchData();
                    // Сбрасываем значения
                    // this.updatedCityId = null;
                    // this.newCityName = '';
                    this.alertMessage = 'Город удален'; // Установите сообщение об успешном удалении
                    this.showAlert(this.alertMessage, 'success'); // Отображение уведомления с типом 'success'
                })
                .catch(error => {
                    console.error('Ошибка при выполнении DELETE запроса:', error);
                });
        },
    },
};