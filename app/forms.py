from django import forms
from .models import Rumor


class RumorCreateForm(forms.ModelForm):
    class Meta:
        model = Rumor
        fields = ('title', 'description')
