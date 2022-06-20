package com.vikins.policedata

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import com.vikins.policedata.databinding.ActivityHomeBinding

class HomeActivity : AppCompatActivity() {
    private lateinit var binding:ActivityHomeBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityHomeBinding.inflate(layoutInflater)
        val Navhost = supportFragmentManager.findFragmentById(binding.navHostFragment.id) as NavHostFragment
        binding.navMenu.setupWithNavController(Navhost.navController)
        setContentView(binding.root)
    }
}