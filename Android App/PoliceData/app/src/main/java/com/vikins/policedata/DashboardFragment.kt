package com.vikins.policedata

import android.app.Activity
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.github.mikephil.charting.animation.Easing
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.components.YAxis
import com.github.mikephil.charting.data.*
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter
import com.github.mikephil.charting.utils.MPPointF
import com.vikins.policedata.databinding.FragmentDashboardBinding
import kotlinx.coroutines.*


class DashboardFragment : Fragment() {
   lateinit var binding: FragmentDashboardBinding
   private var  monthCases: MutableList<Int> = arrayListOf()
   private val stCode = "dto.stCode"
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    @OptIn(DelicateCoroutinesApi::class)
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        for (i in 0..11){
            monthCases.add(0)
        }
        binding = FragmentDashboardBinding.inflate(layoutInflater)
        val labels = arrayListOf(
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun",
            "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec"
        )
        val login = ApiInstance.loginuser().create(ApiService::class.java)
        GlobalScope.launch(Dispatchers.Main){
            val result = login.monthwiseCases(stCode)
            //var cases:ArrayList<Int> = ArrayList()
            monthCases.clear()
            if (result.body() != null){
                Log.d("ByMonth","RESPONSE:${result.body()!!.monthCases}")
                for (i in 0 until result.body()!!.monthCases.size){
                    monthCases.add(result.body()!!.monthCases[i])
                }
                Log.d("Array","RESPONSE:${monthCases.size}")
            }
            setdata()
        }
        setdata()
        plotpiechart()
        Log.d("Array2","RESPONSE:${monthCases.size}")
        return binding.root
    }

    fun setdata(){
        val labels = arrayListOf(
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun",
            "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec"
        )
        binding.linechart.xAxis.valueFormatter = IndexAxisValueFormatter(labels)
//        binding.linechart.axisLeft.isEnabled = false
        binding.linechart.contentDescription = "Cases By Month"
        //binding.linechart.animateX(3000)
        binding.linechart.xAxis.position = XAxis.XAxisPosition.BOTTOM
        binding.linechart.xAxis.granularity = 1f
        val lineentry = ArrayList<BarEntry>()
        for(i in 0..11){

            lineentry.add(BarEntry(i.toFloat(),monthCases[i].toFloat()))
        }

        val linedataset = BarDataSet(lineentry,"first")
        linedataset.valueTextSize = 14f
        linedataset.color = resources.getColor(R.color.purple_200)
        linedataset.setDrawValues(false)
        binding.linechart.description.text = " Cases By Months"
        binding.linechart.data = BarData(linedataset)
        binding.linechart.notifyDataSetChanged()
        binding.linechart.invalidate()
//        binding.linechart.animateX(1800, Easing.EaseInExpo)
    }
    fun plotpiechart(){
        val noGiven = ArrayList<PieEntry>()
        GlobalScope.launch(Dispatchers.Main) {
            val login = ApiInstance.loginuser().create(ApiService::class.java)
            val result = login.categorywiseCases(stCode)
            if (result.body() != null){
              val size =  result.body()!!.categoryCases.size -1
                for (i in 0..size){
                    noGiven.add(PieEntry( result.body()!!.categoryCases[i].value.toFloat() ,result.body()!!.categoryCases[i].key))
                }
            }

            val dataSet = PieDataSet(noGiven,"Cases")
            dataSet.setDrawIcons(false)
            dataSet.sliceSpace = 3f
            dataSet.iconsOffset = MPPointF(0F, 40F)
            dataSet.selectionShift = 5f

            val data = PieData(dataSet)
            data.setValueTextSize(16f)
            data.setValueTextColor(Color.WHITE)
            binding.piechart.data = data
            binding.piechart.highlightValues(null)
            binding.piechart.invalidate()
            binding.piechart.description.text= "Data By Category"
        }

    }
}