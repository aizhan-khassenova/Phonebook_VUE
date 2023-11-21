<template>
    <div class="modal fade" id="modal-update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        {{ title }}
                    </h1>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form @submit.prevent="updateData">
                        <div class="mb-3" id="message-text_container">
                            <label for="message-text" class="col-form-label">
                                {{ inputLabel }}
                            </label>

                            <input v-model="newItem" type="text" @keydown.enter.prevent
                                :class="{ 'form-control': true, 'is-invalid': !newItem, 'is-valid': newItem }"
                                id="message-text" autocomplete="off"
                                :title="newItem ? 'Все хорошо!' : 'Заполните это поле.'" :placeholder="inputplaceholder">
                        </div>

                        <div class="mb-3" id="message-text_container" v-if="apiEndpoint === 'phone'">
                            <label for="message-text" class="col-form-label">
                                {{ inputLabelPhone }}
                            </label>

                            <input v-model="secondParameter" type="text" @input="validateInput" @keydown.enter.prevent
                                :class="{ 'form-control': true, 'is-invalid': !isInputValid, 'is-valid': isInputValid }"
                                id="message-text" autocomplete="off"
                                :title="isInputValid ? 'Все хорошо!' : 'Заполните это поле.'"
                                :placeholder="inputplaceholderPhone">
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancel">
                        Отмена
                    </button>

                    <div
                        :title="apiEndpoint === 'phone' ? (!newItem || !secondParameter ? 'Заполните все поля.' : '') : (!newItem ? 'Заполните все поля.' : '')">
                        <button type="submit" class="btn btn-primary" @click="updateData"
                            :disabled="apiEndpoint === 'phone' ? (!newItem || !secondParameter) : (!newItem)">
                            Обновить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';

// const apiBaseUrl = 'http://172.17.1.31:80'; // Новая переменная для базового URL API
import { apiBaseUrl } from '@/scripts/urls.js';

export default {
    data() {
        return {
            data: null,
            newItem: '',
            secondParameter: '',
        };
    },

    props: {
        title: String,
        inputLabel: String,
        apiEndpoint: String,
        name: String,
        namePhone: String,
        inputplaceholder: String,
        itemId: String,
        alertMessage: String,
        inputLabelPhone: String,
        inputplaceholderPhone: String,
    },

    methods: {
        cancel() {
            this.newItem = '';
            this.secondParameter = '';
            this.isInputValid = false;
        },

        validateInput() {
            this.isInputValid = /^[\d\s+]+$/.test(this.secondParameter);
        },

        updateData() {
            const itemData = {
                [this.name]: this.newItem,
            };

            if (this.apiEndpoint === 'phone') {
                if (!this.isInputValid) {
                    this.$emit('item-updated', 'Номер телефона должен содержать только цифры.', 'danger');
                    return;
                }

                const secondItemData = {
                    [this.namePhone]: this.secondParameter,
                };

                axios.put(`${apiBaseUrl}/api/` + this.apiEndpoint + `/` + this.itemId, { ...secondItemData, ...itemData })
                    .then(response => {
                        console.log(response.data);
                        this.newItem = '';
                        this.secondParameter = ''
                        this.isInputValid = false;
                        this.$emit('item-updated', this.alertMessage, 'success');
                    })

                    .catch(error => {
                        console.error('Ошибка при выполнении PUT запроса:', error);
                        this.$emit('item-updated', error.response.data, 'danger');
                    });
            } else {
                axios.put(`${apiBaseUrl}/api/` + this.apiEndpoint + `/` + this.itemId, itemData)
                    .then(response => {
                        console.log(response.data);
                        this.newItem = '';
                        this.$emit('item-updated', this.alertMessage, 'success');
                    })

                    .catch(error => {
                        console.error('Ошибка при выполнении PUT запроса:', error);
                        this.$emit('item-updated', error.response.data, 'danger');
                    });
            }

            document.querySelector('[data-bs-target="#modal-update"]').click();
        },
    },
};
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>