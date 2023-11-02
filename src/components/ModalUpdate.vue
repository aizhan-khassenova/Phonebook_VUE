<template>
    <div class="modal fade" id="modal-update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form @submit.prevent="updateData">
                        <div class="mb-3" id="message-text_container">
                            <label for="message-text" class="col-form-label">{{ inputLabel }}</label>

                            <input v-model="newItem" type="text"
                                :class="{ 'form-control': true, 'is-invalid': !newItem, 'is-valid': newItem }"
                                id="message-text" autocomplete="off"
                                :title="newItem ? 'Все хорошо!' : 'Заполните это поле.'" :placeholder="inputplaceholder">
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>

                    <div :title="!newItem ? 'Заполните все поля.' : ''">
                        <button type="submit" class="btn btn-primary" @click="updateData"
                            :disabled="!newItem">Обновить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';

export default {
    data() {
        return {
            data: null, // Инициализируем переменную для хранения данных
            newItem: '', // Добавьте новое поле для хранения названия нового города
            updatedItemId: null, // Добавляем поле для хранения идентификатора обновляемого города
        };
    },

    props: {
        title: String, // Определяем свойство title
        inputLabel: String, // Определяем свойство для текстовой метки поля ввода
        submitButtonText: String, // Определяем свойство для текста кнопки отправки
        apiEndpoint: String, // Добавьте это свойство
        name: String,
        inputplaceholder: String,
        itemId: String,
        alertMessage: String
    },

    methods: {
        updateData() {
            const itemData = {
                [this.name]: this.newItem,
            };

            // Посылаем PUT-запрос на сервер для обновления города
            axios.put('https://localhost:5001/api/' + this.apiEndpoint + '/' + this.itemId, itemData)
                .then(response => {
                    // this.$emit('item-updated'); // Отправляем событие с новым элементом (городом или улицей)
                    console.log(response.data);
                    this.newItem = '';

                    // this.alertMessage = 'Город обновлен';
                    // this.showAlert(this.alertMessage, 'success');
                    this.$emit('item-updated', this.alertMessage, 'success'); // Передаем сообщение и тип уведомления
                })
                .catch(error => {
                    console.error('Ошибка при выполнении PUT запроса:', error);
                    // this.alertMessage = error.response.data;
                    // this.showAlert(this.alertMessage, 'danger');
                    this.$emit('item-updated', error.response.data, 'danger'); // Передаем сообщение и тип уведомления
                });

            document.querySelector('[data-bs-target="#modal-update"]').click();
        },
    },
};
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/city.css"></style>