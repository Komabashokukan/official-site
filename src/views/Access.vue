<template>
    <div class="access h-100">
        <div class="container-md align-middle pt-4 pl-sm-5 bg-light h-100">
            <div class="text-left">
                <h2>アクセス</h2>
                <p>〒153-0041 東京都目黒区駒場3-8-1 東京大学教養学部多目的ホール</p>
                <p>京王井の頭線「駒場東大前駅」下車徒歩七分</p>
                <p><u>駐車場などはございませんので、公共交通機関をご利用ください。</u></p>
            </div>

            <div class="row mt-4 mt-sm-5">
                <div class="col-sm embed-responsive embed-responsive-1by1">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.6980397054963!2d139.68550101484388!3d35.659810580199306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f353919ea56f%3A0xd619d48f6dc33bb8!2z6aeS5aC05bCP56m66ZaTICjmnbHlpKfpp5LloLTjgq3jg6Pjg7Pjg5Hjgrkg5aSa55uu55qE44Ob44O844OrKQ!5e0!3m2!1sja!2sjp!4v1463417096374" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
                </div>
                <div class="col-sm">
                    <img class="img-fluid" alt="komaba_map.png" src="@/assets/komaba_map.png" data-toggle="modal" data-target="#map_modal" style="cursor:pointer;" />
                </div>

                <div class="modal fade" id="map_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                    <div class="modal-dialog modal-lg modal-middle">
                        <div class="modal-content">
                            <div class="modal-body">
                                <img class="aligncenter img-fluid" alt="komaba_map.png" src="@/assets/komaba_map.png" data-toggle="modal" data-target="#map_modal" />
                            </div>
                            <div class="modal-img_footer text-right pr-2 pb-3">
                                <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.access {
    background-color: #000000;
    margin-bottom: 15vh;
}
</style>
