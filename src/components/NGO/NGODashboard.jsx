import React from 'react';
import { Globe, Users, TrendingUp, Award, MapPin, Calendar } from 'lucide-react';

const NGODashboard = () => {
  const stats = [
    {
      title: 'Partner Schools',
      value: '47',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      change: '+3 this month'
    },
    {
      title: 'Active Campaigns',
      value: '12',
      icon: Globe,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      change: '5 launching soon'
    },
    {
      title: 'Student Participants',
      value: '18,429',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      change: '+2,156 this month'
    },
    {
      title: 'Environmental Impact',
      value: '94.2%',
      icon: Award,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      change: 'Engagement rate'
    }
  ];

  const activeCampaigns = [
    {
      id: '1',
      title: 'Clean Water Initiative 2024',
      description: 'Raising awareness about water conservation and access',
      schools: 15,
      participants: 4250,
      startDate: '2025-01-15',
      endDate: '2025-03-15',
      progress: 68,
      status: 'active'
    },
    {
      id: '2',
      title: 'Zero Waste Campus Challenge',
      description: 'Reducing waste generation in educational institutions',
      schools: 23,
      participants: 6800,
      startDate: '2025-02-01',
      endDate: '2025-04-30',
      progress: 45,
      status: 'active'
    },
    {
      id: '3',
      title: 'Green Transportation Week',
      description: 'Promoting sustainable transportation methods',
      schools: 18,
      participants: 3200,
      startDate: '2025-02-20',
      endDate: '2025-02-26',
      progress: 92,
      status: 'active'
    }
  ];

  const topSchools = [
    { name: 'XYZ Public School', participants: 892, points: 487230, location: 'Kanpur,UP' },
    { name: 'ABC International School', participants: 756, points: 423180, location: 'Lucknow,UP' },
    { name: 'Aryan Public School', participants: 634, points: 378450, location: 'Varansai,UP' },
    { name: 'SSM International School', participants: 589, points: 334290, location: 'Prayagraj,UP' },
    { name: 'Subash Public School', participants: 521, points: 298760, location: 'Gorakhpur,UP' }
  ];

  const recentUpdates = [
    {
      id: '1',
      title: 'New Partnership Agreement Signed',
      description: 'Riverside College joined the Clean Water Initiative',
      time: '3 hours ago',
      type: 'partnership'
    },
    {
      id: '2',
      title: 'Campaign Milestone Achieved',
      description: 'Zero Waste Challenge reached 5,000 participants',
      time: '6 hours ago',
      type: 'milestone'
    },
    {
      id: '3',
      title: 'Resource Upload Complete',
      description: 'New sustainability toolkit available for download',
      time: '1 day ago',
      type: 'resource'
    },
    {
      id: '4',
      title: 'Monthly Impact Report Generated',
      description: 'January 2024 environmental impact analysis ready',
      time: '2 days ago',
      type: 'report'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">NGO Dashboard</h1>
        <p className="text-gray-600">
          Monitor your environmental campaigns and track impact across partner institutions.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-6 transition-transform duration-200 hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">{stat.title}</p>
                <p className="text-xs text-gray-600">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Campaigns and Updates */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Campaigns */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Active Campaigns</h2>
              <Globe className="h-5 w-5 text-green-600" />
            </div>
            
            <div className="space-y-6">
              {activeCampaigns.map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{campaign.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{campaign.schools} schools</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{campaign.participants.toLocaleString()} participants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Campaign Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Updates</h2>
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
            
            <div className="space-y-4">
              {recentUpdates.map((update) => (
                <div key={update.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm">{update.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Top Schools */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top Partner Schools</h2>
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            
            <div className="space-y-4">
              {topSchools.map((school, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm truncate">{school.name}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{school.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-gray-600">{school.participants} students</span>
                      <span className="font-semibold text-green-600">
                        {school.points.toLocaleString()} pts
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="space-y-3">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition-colors duration-200 text-sm">
                Launch New Campaign
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors duration-200 text-sm">
                Upload Resources
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-medium transition-colors duration-200 text-sm">
                Generate Impact Report
              </button>
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded-lg font-medium transition-colors duration-200 text-sm">
                View All Schools
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
