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
   private val stCode = "abc1"
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
        //radarchart()
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
//    fun radarchart(){
//        var theftblweighteen = 0
//        var theftblwthirty = 0
//        var theftabvthirty = 0
//        var murderblweighteen = 0
//        var murderblwthirty = 0
//        var murderabvthirty = 0
//        var vioblweighteen = 0
//        var vioblwthirty = 0
//        var vioabvthirty = 0
//        var phblweighteen = 0
//        var phblwthirty = 0
//        var phabvthirty = 0
//        var othblweighteen = 0
//        var othblwthirty = 0
//        var othabvthirty = 0
//        GlobalScope.launch(Dispatchers.Main) {
//            val login = ApiInstance.loginuser().create(ApiService::class.java)
//            val result = login.getallcase()
//            if (result.body() != null){
//                Log.d("RADAR", result.body()!!.allCases.size.toString())
////                val size =  result.body()!!.allCases.size
////                for (i in 0..size){
////                    val size2 = result.body()!!.allCases[i].victim.size
////                    if (result.body()!!.allCases[i].category == "Theft"){
////                        for(j in 0..size2){
////                            if(result.body()!!.allCases[i].victim[j].age<18){
////                                theftblweighteen+=1
////                            }
////                            else if(result.body()!!.allCases[i].victim[j].age in 19..29){
////                                theftblwthirty+=1
////                            }
////                            else{
////                                theftabvthirty+=1
////                            }
////                        }
////                    }
////                    else if (result.body()!!.allCases[i].category == "Murder"){
////                        for(j in 0..size2){
////                            if(result.body()!!.allCases[i].victim[j].age<18){
////                                murderblweighteen+=1
////                            }
////                            else if(result.body()!!.allCases[i].victim[j].age in 19..29){
////                                murderblwthirty+=1
////                            }
////                            else{
////                                murderabvthirty+=1
////                            }
////                        }
////                    }
////                    else if (result.body()!!.allCases[i].category == "Violence"){
////                        for(j in 0..size2){
////                            if(result.body()!!.allCases[i].victim[j].age<18){
////                                vioblweighteen+=1
////                            }
////                            else if(result.body()!!.allCases[i].victim[j].age in 19..29){
////                                vioblwthirty+=1
////                            }
////                            else{
////                                vioabvthirty+=1
////                            }
////                        }
////                    }
////                    else if (result.body()!!.allCases[i].category == "Physical Harrasment"){
////                        for(j in 0..size2){
////                            if(result.body()!!.allCases[i].victim[j].age<18){
////                                phblweighteen+=1
////                            }
////                            else if(result.body()!!.allCases[i].victim[j].age in 19..29){
////                                phblwthirty+=1
////                            }
////                            else{
////                                phabvthirty+=1
////                            }
////                        }
////                    }
////                    else{
////                        for(j in 0..size2){
////                            if(result.body()!!.allCases[i].victim[j].age<18){
////                                othblweighteen+=1
////                            }
////                            else if(result.body()!!.allCases[i].victim[j].age in 19..29){
////                                othblwthirty+=1
////                            }
////                            else{
////                                othabvthirty+=1
////                            }
////                        }
////                    }
////                }
//            }
//
//            var datavals = ArrayList<RadarEntry>()
//            datavals.add(RadarEntry(theftblweighteen.toFloat()))
//            datavals.add(RadarEntry(murderblweighteen.toFloat()))
//            datavals.add(RadarEntry(vioblweighteen.toFloat()))
//            datavals.add(RadarEntry(phblweighteen.toFloat()))
//            datavals.add(RadarEntry(othblweighteen.toFloat()))
//
//            var datavals2 = ArrayList<RadarEntry>()
//            datavals2.add(RadarEntry(theftblwthirty.toFloat()))
//            datavals2.add(RadarEntry(murderblwthirty.toFloat()))
//            datavals2.add(RadarEntry(vioblwthirty.toFloat()))
//            datavals2.add(RadarEntry(phblwthirty.toFloat()))
//            datavals2.add(RadarEntry(othblwthirty.toFloat()))
//
//            var datavals3 = ArrayList<RadarEntry>()
//            datavals3.add(RadarEntry(theftabvthirty.toFloat()))
//            datavals3.add(RadarEntry(murderabvthirty.toFloat()))
//            datavals3.add(RadarEntry(vioabvthirty.toFloat()))
//            datavals3.add(RadarEntry(phabvthirty.toFloat()))
//            datavals3.add(RadarEntry(othabvthirty.toFloat()))
//
//            val radardataset1 = RadarDataSet(datavals,"Below 18")
//            val radardataset2= RadarDataSet(datavals2,"Between 18 and 30")
//            val radardataset3 = RadarDataSet(datavals3,"Above 30")
////            radardataset1.color(R.color.purple_200)
////            radardataset2.color(R.color.purple_500)
////            radardataset2.color(R.color.purple_700)
//
//            radardataset1.color = resources.getColor(R.color.purple_200)
//            radardataset2.color = resources.getColor(R.color.purple_500)
//            radardataset3.color = resources.getColor(R.color.purple_700)
//            val labels = arrayListOf(
//                "Theft", "Murder", "Violence",
//                "Physical Harassment","Others"
//            )
//            binding.radarchart.xAxis.valueFormatter = IndexAxisValueFormatter(labels)
//            var data = RadarData(radardataset1)
//            data.addDataSet(radardataset2)
//            data.addDataSet(radardataset3)
//
//            binding.radarchart.data = data
//        }
//    }
}