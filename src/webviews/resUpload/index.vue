<template>
    <div>
        <input
            type="file"
            id="pdf"
            accept=".pdf"
           
            @change="preview"/>

        <div class="header">

            <a @click="upload2local" class="upload2local">
                <nb-icon type="upload"></nb-icon>&nbsp;上传PDF
            </a>

        </div>
        <embed :src="localres" width="800px" height="2100px" />
        <div id="flashContent_parent" style="height: 603px; position: relative;">
            <div
                id="flashContent_display"
                style="display: block; text-align: left; height: 100%;">
                <iframe :src="localres" width="100%" height="100%"></iframe>
            </div>
        </div>
    </div>
</template>
<style>
    .header {
        height: 50px;
        padding: 10px;
    }
    .upload2local {

        height: 30px;
        cursor: pointer;
    }
</style>
<script>
    export default {
        data() {
            return {localres: ''}
        },
        mounted() {
            document
                .getElementById('pdf')
                .addEventListener('click', (e) => {
                    console.log(e);

                });

        },
        methods: {
            upload2local() {
                console.log(1);
                document
                    .getElementById('pdf')
                    .click();
            },
            preview(e) {
            console.log(e);
                this.localres = e.target.value;
            }
        }
    }
</script>