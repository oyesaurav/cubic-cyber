package com.vikins.policedata

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.vikins.policedata.databinding.ActivityMainBinding
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import retrofit2.create
import android.app.Activity as th

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private var check = false
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        binding.btnlogin.setOnClickListener {
            loginuser()
        }
        setContentView(binding.root)
    }

    fun loginuser(){
        val id = binding.etLgnId.text.toString()
        val pass = binding.etLgnpass.text.toString()
        val login = ApiInstance.loginuser().create(ApiService::class.java)
        GlobalScope.launch {
            val result = login.userlogin(id,pass)
            if (result.body() != null){
                Log.d("LOGIN","RESPONSE:${result.body()}")
                startActivity(Intent(this@MainActivity,HomeActivity::class.java))
            }
        }
    }
}