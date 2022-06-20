package com.vikins.policedata

data class CaseData(
    val accused: List<Accused>,
    val caseNo: String,
    val category: String,
    val section: String,
    val severity: Int,
    val stCode: String,
    val victim: List<Victim>
)