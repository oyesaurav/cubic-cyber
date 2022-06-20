package com.vikins.policedata

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.vikins.policedata.databinding.FragmentSearchBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class SearchFragment : Fragment() {
    lateinit var binding:FragmentSearchBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding = FragmentSearchBinding.inflate(layoutInflater)
        binding.floatingActionButton.setOnClickListener {
//            val api = ApiInstance.loginuser().create(ApiService::class.java)
//            GlobalScope.launch(Dispatchers.Main) {
//                val result = api.caseadd(case)
//                if (result.body() != null){
//                    Log.d("CASEADD",result.body().toString())
//                }
//
//            }
            val direction = SearchFragmentDirections.actionSearchFragmentToFirrecordsFragment()
            findNavController().navigate(direction)
        }
        binding.btnSearch.setOnClickListener {
            val caseno = binding.etsearch.text.toString()
            val api = ApiInstance.loginuser().create(ApiService::class.java)
            GlobalScope.launch(Dispatchers.Main) {
                val result = api.search(caseno)
                if (result.body() != null){
                    Log.d("SEARCH",result.body().toString())
                    binding.caseDetails.text = "Case Details: ${result.body()!!.caseInfo}"
                    binding.criminalDetails.text = "Criminal Info: ${result.body()!!.criminalsInfo}"
                }

            }
        }
        return binding.root
    }

}