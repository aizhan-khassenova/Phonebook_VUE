<template>
    <div class="modal fade" id="modal-delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        {{ title }}
                    </h1>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body" id="mb-delete">
                    <form @submit.prevent="deleteData">
                        <label id="l-delete">
                            <h1>
                                <i class="bi bi-exclamation-triangle-fill" id="i-danger"></i>
                            </h1>

                            {{ inputLabel }}
                        </label>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Отмена
                    </button>

                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteData">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';

export default {
    props: {
        title: String,
        inputLabel: String,
        apiEndpoint: String,
        itemId: String,
        alertMessage: String
    },

    methods: {
        deleteData() {
            axios.delete('https://localhost:5001/api/' + this.apiEndpoint + '/' + this.itemId)

                .then(response => {
                    console.log(response.data);
                    this.$emit('item-deleted', this.alertMessage, 'success');
                })

                .catch(error => {
                    console.error('Ошибка при выполнении DELETE запроса:', error);
                });
        },
    },
};
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>

<style scoped>
#i-danger {
    color: var(--bs-red);
    margin-right: 15px;
}

#l-delete {
    display: flex;
    text-align: left;
}
</style>