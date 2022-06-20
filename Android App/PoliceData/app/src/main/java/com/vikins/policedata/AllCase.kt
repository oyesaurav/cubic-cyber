package com.vikins.policedata

data class AllCase(
    val __v: Int,
    val _id: String,
    val accusedAadhaarNo: List<Long>,
    val caseNo: String,
    val category: String,
    val date: String,
    val section: String,
    val severity: Int,
    val solved: Boolean,
    val stCode: String,
    val victim: List<VictimXX>
)