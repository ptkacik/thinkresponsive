from django.conf.urls.defaults import patterns, url
from .views import (
    HomeView,        
)

urlpatterns = patterns(
    '',
    url(r'^$', HomeView.as_view(), name='home'),
)

