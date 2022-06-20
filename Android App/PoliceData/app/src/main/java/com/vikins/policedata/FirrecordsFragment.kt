package com.vikins.policedata

import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.Toast
import androidx.navigation.fragment.findNavController
import com.vikins.policedata.databinding.FragmentDashboardBinding
import com.vikins.policedata.databinding.FragmentFirrecordsBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch


class FirrecordsFragment : Fragment() {
   lateinit var binding:FragmentFirrecordsBinding
    var aadhaarNo: Long = 0
    var address: String = ""
    var age: Int = 0
    var gender:String = "Neutral"
    var fname: String = ""
    val accused:ArrayList<Accused> = arrayListOf()
    val victims:ArrayList<Victim> = arrayListOf()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding = FragmentFirrecordsBinding.inflate(layoutInflater)
        binding.tvAddvictim.setOnClickListener {
            AddVictim(binding.root)
        }
        binding.tvAddaccuse.setOnClickListener {
            AddAccuse(binding.root)
        }
        val btn = binding.crimecategory.checkedRadioButtonId
        var cat = "Other"
        when (btn){
            binding.Theft.id->{
                cat = binding.Theft.text.toString()
            }
            binding.Violence.id->{
                cat = binding.Violence.text.toString()
            }
            binding.Murder.id->{
                cat = binding.Murder.text.toString()
            }
            binding.agaistwomen.id->{
                cat = binding.agaistwomen.text.toString()
            }
        }
        binding.btnSubmit.setOnClickListener {
            val case = CaseData(accused,binding.etcaseno.text.toString(),cat,binding.etSetion.text.toString(),binding.etseverity.text.toString().toInt(),"dto.stCode",victims)
            val api = ApiInstance.loginuser().create(ApiService::class.java)
            GlobalScope.launch(Dispatchers.Main) {
                val result = api.caseadd(case)
                if (result.body() != null){
                    Log.d("CASEADD",result.body().toString())
                    if (result.body()!!.message == "case registered"){
                        Toast.makeText(activity as Context,"Case Added",Toast.LENGTH_SHORT).show()
                        val direction = FirrecordsFragmentDirections.actionFirrecordsFragmentToSearchFragment()
                        findNavController().navigate(direction)
                    }
                    else{
                        Toast.makeText(activity as Context, result.body()!!.message,Toast.LENGTH_SHORT).show()
                    }
                }

            }
        }
        return binding.root
    }

    fun AddAccuse(view: View) {
        val builder = AlertDialog.Builder(activity)
        val inflater = layoutInflater
        builder.setTitle("Add Accuse")
        val dialogLayout = inflater.inflate(R.layout.addperson, null)
        val etaadhaar  = dialogLayout.findViewById<EditText>(R.id.etAadhaar)
        val etaddress  = dialogLayout.findViewById<EditText>(R.id.etAddress)
        val etage  = dialogLayout.findViewById<EditText>(R.id.etAge)
//        val male  = dialogLayout.findViewById<RadioButton>(R.id.male)
//        val female  = dialogLayout.findViewById<RadioButton>(R.id.female)
//        val neutral  = dialogLayout.findViewById<RadioButton>(R.id.Neutral)
        val etname = dialogLayout.findViewById<EditText>(R.id.etName)
        val radioGroup = dialogLayout.findViewById<RadioGroup>(R.id.gender)
        builder.setView(dialogLayout)
        builder.setPositiveButton("ADD") { dialogInterface, i ->
            aadhaarNo = etaadhaar.text.toString().toLong()
            address = etaddress.text.toString()
            age = etage.text.toString().toInt()
            val intSelectButton: Int = radioGroup!!.checkedRadioButtonId
            val radioButton = dialogLayout.findViewById<RadioButton>(intSelectButton)
            gender = radioButton.text.toString()
            fname = etname.text.toString()
            val accuse = Accused(aadhaarNo,address,age,gender,fname)
            accused.add(accuse)
        }
        builder.show()
    }
    fun AddVictim(view: View) {
        val builder = AlertDialog.Builder(activity)
        val inflater = layoutInflater
        builder.setTitle("Add Victrim")
        val dialogLayout = inflater.inflate(R.layout.addperson, null)
        val etaadhaar  = dialogLayout.findViewById<EditText>(R.id.etAadhaar)
        val etaddress  = dialogLayout.findViewById<EditText>(R.id.etAddress)
        val etage  = dialogLayout.findViewById<EditText>(R.id.etAge)
//        val male  = dialogLayout.findViewById<RadioButton>(R.id.male)
//        val female  = dialogLayout.findViewById<RadioButton>(R.id.female)
//        val neutral  = dialogLayout.findViewById<RadioButton>(R.id.Neutral)
        val etname = dialogLayout.findViewById<EditText>(R.id.etName)
        val radioGroup = dialogLayout.findViewById<RadioGroup>(R.id.gender)
        builder.setView(dialogLayout)
        builder.setPositiveButton("ADD") { dialogInterface, i ->
            aadhaarNo = etaadhaar.text.toString().toLong()
            address = etaddress.text.toString()
            age = etage.text.toString().toInt()
            val intSelectButton: Int = radioGroup!!.checkedRadioButtonId
            val radioButton = dialogLayout.findViewById<RadioButton>(intSelectButton)
            gender = radioButton.text.toString()
            fname = etname.text.toString()
            val victim = Victim(aadhaarNo,address,age,gender,fname)
            victims.add(victim)
        }
        builder.show()
    }
}