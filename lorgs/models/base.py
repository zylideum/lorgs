
import weakref

# IMPORT THIRD PARTY LIBRARIES

# IMPORT LOCAL LIBRARIES
from lorgs import utils


class MetaInstanceRegistry(type):
    """Metaclass providing an instance registry."""

    def __init__(cls, name, bases, attrs):
        super(MetaInstanceRegistry, cls).__init__(name, bases, attrs)
        cls.all = weakref.WeakSet()

    def __call__(cls, *args, **kwargs):
        instance = super(MetaInstanceRegistry, cls).__call__(*args, **kwargs)

        # Store weak reference to instance. WeakSet will automatically remove
        # references to objects that have been garbage collected
        cls.all.add(instance)
        return instance



class IconPathMixin:
    """docstring for img_path_mixin"""

    @property
    def icon_path(self):
        if not self.icon_name:
            return ""
        return f"/static/images/{self.icon_name}"


class Model(IconPathMixin, metaclass=MetaInstanceRegistry):
    """

    TODO:
        - add filter
    """

    @classmethod
    def get(cls, **kwargs):
        return utils.get(cls.all, **kwargs)
