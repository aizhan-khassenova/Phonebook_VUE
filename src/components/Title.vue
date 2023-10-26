<template>
    <div class="row">
        <div class="col-12">
            <div class="col-2" id="title_container">
                <h1 class="text-start colorGreen"><strong>{{ title }}</strong></h1>

                <div class="btn-container">
                    <button type="button" class="btn btn-primary" id="btn-create" data-bs-toggle="modal"
                        data-bs-target="#myModal"><strong>+</strong></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: String, // Определяем свойство title
  },
};
</script>