package com.vikins.policedata

import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.http.*

interface ApiService {
    @FormUrlEncoded
    @POST("/auth/signin")
    suspend fun userlogin(@Field ("stCode")stCode:String, @Field("password") password:String):Response<UserData>

//    @GET("/auth/check")
//    suspend fun checkuser():Response<Boolean>
    @FormUrlEncoded
    @POST("/case/monthCases")
    suspend fun monthwiseCases(@Field("stCode")stCode:String):Response<CasesByMonthData>
    @FormUrlEncoded
    @POST("/case/categoryCases")
    suspend fun categorywiseCases(@Field("stCode")stCode:String):Response<CategorywiseCasesData>
    @POST("/case/register")
    suspend fun caseadd(@Body caseData: CaseData):Response<CaseUploadStatus>
    @POST("/case/get")
    @FormUrlEncoded
    suspend fun search(@Field("caseNo") caseNo:String):Response<CaseDeails>
}