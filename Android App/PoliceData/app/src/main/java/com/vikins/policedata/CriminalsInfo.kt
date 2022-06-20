package com.vikins.policedata

data class CriminalsInfo(
    val __v: Int,
    val _id: String,
    val aadhaarNo: Long,
    val address: List<String>,
    val age: Int,
    val cases: List<Case>,
    val name: String
)