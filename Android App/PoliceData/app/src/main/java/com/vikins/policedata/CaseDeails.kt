package com.vikins.policedata

data class CaseDeails(
    val caseInfo: CaseInfo,
    val criminalsInfo: List<CriminalsInfo>
)