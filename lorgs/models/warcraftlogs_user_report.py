"""Classes/Functions to manage Reports injected through user interaction."""

# IMPORT STANDARD LIBRARIES
from datetime import datetime
import typing

# IMPORT LOCAL LIBRARIES
from lorgs.lib import dynamodb
from lorgs.models.warcraftlogs_report import Report


class UserReport(Report, dynamodb.BaseModel):
    """A single report loaded via the custom reports module.

    Todo:
        * Test performance when splitting each report into its own row,
          saved with the same partion, but different secondary key

    """

    # datetime: timetamp of last update
    updated: datetime = datetime.min

    # Config
    pkey: typing.ClassVar[str] = "{report_id}"
    skey: typing.ClassVar[str] = "overview"

    ################################
    # Properties
    #
    @property
    def is_loaded(self) -> bool:
        return bool(self.fights)

    ################################
    # Methods
    #
    def save(self, *args: typing.Any, **kwargs: typing.Any) -> None:  # pylint: disable=arguments-differ
        """Update the timestamp and Save the Report."""
        self.updated = datetime.utcnow()
        return super().save(*args, **kwargs)
